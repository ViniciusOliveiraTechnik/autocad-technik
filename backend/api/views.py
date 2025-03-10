from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import permissions
from rest_framework import status

import os
import pandas as pd
import tempfile

from .utilits import AutocadManipulator
from .models import Tag, File
from .serializers import TagSerializer, FileSerializer

@api_view(['POST'])
@permission_classes((permissions.AllowAny,))
def recieve_file(request):
    try:
        if 'file' not in request.FILES:
            return Response({'error': 'Nenhum arquivo enviado'}, status=status.HTTP_400_BAD_REQUEST)
        
        file = request.FILES['file']

        if not file.name.lower().endswith('.dwg'):
            return Response({'error': 'Formato de arquivo não suportado, "dwg" esperado'}, status=status.HTTP_415_UNSUPPORTED_MEDIA_TYPE)

        with tempfile.NamedTemporaryFile(delete=False, suffix=".dwg") as temp_file:
            for chunk in file.chunks():
                temp_file.write(chunk)

            temp_file.flush()
            temp_file_path = temp_file.name
            temp_file_name = os.path.basename(temp_file_path)

        try:
            manipulator = AutocadManipulator()
            manipulator.connect_to_autocad(temp_file_path)
            
        except Exception as e:
            os.remove(temp_file_path)
            return Response({'error': f'Erro ao se conectar ao AutoCAD: {str(e)}'}, status=status.HTTP_503_SERVICE_UNAVAILABLE)
        
        file = File.objects.create(file_name=temp_file_name, file_path=temp_file_path)
        file_serializer = FileSerializer(file)

        return Response({'data': file_serializer.data, 'details': 'Conectado com sucesso'}, status=status.HTTP_200_OK)

    except Exception as e:
        return Response({'error': f'Erro ao receber arquivo: {str(e)}'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes((permissions.AllowAny,))
def extract_tags(request, file_id):
    try:
        file = File.objects.get(id=file_id)

        try:
            manipulator = AutocadManipulator()
            manipulator.connect_to_autocad(file.file_path)

            acad_doc = manipulator.acad_doc
            tag_values = manipulator.extract_tags(acad_doc)

            tag_objects = [Tag(old_tag=value, new_tag="", file_id=file) for value in tag_values]

            Tag.objects.bulk_create(tag_objects)

            tag_serializer = TagSerializer(tag_objects, many=True)

            return Response(tag_serializer.data, status=status.HTTP_201_CREATED)

        except Exception as e:
            return Response({'error': f'Erro ao obter dados do AutoCAD: {str(e)}'}, status=status.HTTP_503_SERVICE_UNAVAILABLE)

    except File.DoesNotExist:
        return Response({'error': 'Arquivo não encontrado'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'error': f'Erro inesperado: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)