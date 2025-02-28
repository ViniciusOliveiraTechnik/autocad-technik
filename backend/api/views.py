from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import permissions
from rest_framework import status

import os
import uuid
import pandas as pd
import tempfile

from .utilits import AutoCadManipulator
from .models import Tag, User
from .serializers import TagSerializer

@api_view(['POST'])
@permission_classes((permissions.AllowAny,))
def connect_file(request):
    if 'file' not in request.FILES:
        return Response({'error': 'Nenhum arquivo enviado'}, status=status.HTTP_400_BAD_REQUEST)
    
    file = request.FILES['file']

    with tempfile.NamedTemporaryFile(delete=False, suffix=".dwg") as temp_file:
        for chunk in file.chunks():
            temp_file.write(chunk)

        temp_file_path = temp_file.name
        temp_file_name = os.path.basename(temp_file_path)
    
    autocad = AutoCadManipulator()
    connection = autocad.auth_autocad(temp_file_path)
    if connection['success']:
        acad = autocad.active_document

    return Response({'filename': temp_file_name, 'details': 'Conectado com sucesso'}, status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes((permissions.AllowAny,))
def upload_file(request):
    if 'file' not in request.FILES:
        return Response({'error': 'Nenhum arquivo enviado.'}, status=status.HTTP_400_BAD_REQUEST)
    
    file = request.FILES['file']
    
    with tempfile.NamedTemporaryFile(delete=False, suffix=".dwg") as temp_file:
        for chunk in file.chunks():
            temp_file.write(chunk)
        
        temp_file_path = temp_file.name

    atc = AutoCadManipulator()
    connection = atc.auth_autocad(temp_file_path)

    if connection.success:
        acad = atc.active_document

        try:        
            temp_user = User.objects.create(username=f"temp_{uuid.uuid4().hex[:8]}")
        except Exception as error:
            return Response({'error': f'Não foi possível criar o usuário temporário: {str(error)}'})

        try:
            tags = atc.get_tags(acad)  

            tags_df = pd.DataFrame(tags, columns=['old_tag']).drop_duplicates(ignore_index=True)
            tags_objects = [Tag(old_tag=row.old_tag, user=temp_user) for _, row in tags_df.iterrows()]
            
            Tag.objects.bulk_create(tags_objects)

            data = Tag.objects.filter(user=temp_user)
            serializer = TagSerializer(data, many=True)

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        except Exception as error:
            return Response({'error': f'Não foi possível extrair as tags: {str(error)}'})
        # try:
        #     Tag.objects.all().delete()
            
        #     tags = atc.get_tags(acad)

        #     tags_df = pd.DataFrame(tags, columns=['old_tag']).drop_duplicates(ignore_index=True)

        #     tags_objects = [Tag(old_tag=row.old_tag) for _, row in tags_df.iterrows()]
        #     Tag.objects.bulk_create(tags_objects)

        #     data = Tag.objects.all()
        #     serializer = TagSerializer(data, many=True)

        #     return Response(serializer.data, status=status.HTTP_200_OK)
        
        # except Exception as error:  
        #     return Response({'error': str(error)}, status=status.HTTP_406_NOT_ACCEPTABLE)
        
@api_view(['POST'])
@permission_classes((permissions.AllowAny,))
def modify_tags(request):
    serializer = TagSerializer(data=request.data)
    if serializer.is_valid():
        print(serializer.data)