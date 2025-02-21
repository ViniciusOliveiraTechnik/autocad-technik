from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import permissions
from rest_framework import status

import os
import pandas as pd
import tempfile

from .utilits import AutoCadManipulator
from .models import Tag
from .serializers import TagSerializer

@api_view(['POST', 'GET'])
@permission_classes((permissions.AllowAny,))
def tag_list(request):
    """
    List all tags, or create a new tag
    """
    if request.method == 'GET':
        tags = Tag.objects.all()
        serializer = TagSerializer(tags, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    elif request.method == 'POST':
        serializer = TagSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

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
            Tag.objects.all().delete()
            
            tags = atc.get_tags(acad)

            tags_df = pd.DataFrame(tags, columns=['old_tag']).drop_duplicates(ignore_index=True)

            tags_objects = [Tag(old_tag=row.old_tag) for _, row in tags_df.iterrows()]
            Tag.objects.bulk_create(tags_objects)

            data = Tag.objects.all()
            serializer = TagSerializer(data, many=True)

            return Response(serializer.data, status=status.HTTP_200_OK)
        
        except Exception as error:  
            return Response({'error': str(error)}, status=status.HTTP_406_NOT_ACCEPTABLE)
        
@api_view(['POST'])
@permission_classes((permissions.AllowAny,))
def modify_tags(request):
    pass
