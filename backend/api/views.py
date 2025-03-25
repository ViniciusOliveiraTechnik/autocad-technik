from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import permissions
from rest_framework import status

import os
import json
from uuid import UUID
import pandas as pd
import tempfile

from .utilits import AutocadManipulator
from .models import Tag, File
from .serializers import TagSerializer, FileSerializer

@api_view(['POST'])
@permission_classes((permissions.AllowAny,))
def recieve_file(request):
    try:
        print('chamoui')
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
        
        File.objects.all().delete()

        file = File.objects.create(file_name=temp_file_name, file_path=temp_file_path)
        file_serializer = FileSerializer(file)

        return Response({'data': file_serializer.data}, status=status.HTTP_200_OK)

    except Exception as e:
        return Response({'error': f'Erro ao receber arquivo: {str(e)}'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes((permissions.AllowAny,))
def extract_tags(request, file_id):
    try:
        file = File.objects.get(id=file_id)

        try:
            manipulator = AutocadManipulator()
            acad = manipulator.connect_to_autocad(file.file_path)

            try:
                tag_values = json.loads(manipulator.extract_tags(acad))   
                
            except json.JSONDecodeError:
                return Response({'error': 'Erro ao processar os dados obtidos do AutoCAD'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

            tag_objects = [Tag(old_tag=tag['old_tag'], old_tag_regex=tag['old_tag_regex'], new_tag="", file_id=file) for tag in tag_values]

            # Verify if already have tags for this file
            tags = Tag.objects.filter(file_id=file).delete()

            Tag.objects.bulk_create(tag_objects)

            tag_serializer = TagSerializer(tag_objects, many=True)

            return Response(tag_serializer.data, status=status.HTTP_201_CREATED)

        except Exception as e:
            return Response({'error': f'Erro ao obter dados do AutoCAD: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    except File.DoesNotExist:
        return Response({'error': 'Arquivo não encontrado ou não existente'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
@api_view(['POST'])
@permission_classes((permissions.AllowAny,))
def modify_tags(request, file_id): 

    # Get the data source of user request
    data = request.data.get('data')

    # Data exists?
    if not data:
        return Response({'error': 'Nenhum dado recebido para modificação'}, status=status.HTTP_400_BAD_REQUEST)

    # Try to lookup the file id
    try:
        file = File.objects.get(id=file_id)
    except File.DoesNotExist:
        return Response({'error': 'Arquivo não encontrado ou não existente'}, status=status.HTTP_404_NOT_FOUND)

    try:
        # Create a instance of the AutoCADManipulator 
        manipulator = AutocadManipulator()
        acad = manipulator.connect_to_autocad(file.file_path) # Connect to current file
        
        # Get all tags IDs
        tag_ids = [UUID(tag['id']) for tag in data]

        # Get all tag objects
        tag_map = Tag.objects.in_bulk(tag_ids)

        updated_tags = [] # To save the new data
        
        # Lookup to get object
        for tag in data:
            tag_instance = tag_map.get(UUID(tag['id']))
            if not tag_instance:
                return Response({'error': f'A Tag "{tag["old_tag_regex"]}" não foi encontrada'}, status=status.HTTP_404_NOT_FOUND)

            # Saving in array
            tag_instance.new_tag = tag['new_tag']
            updated_tags.append(tag_instance)
        
        # Updating all data in one query
        Tag.objects.bulk_update(updated_tags, ['new_tag'])
        
        # Creating the serialization
        tag_serializer = TagSerializer(updated_tags, many=True)
        
        # Calling the modify function
        manipulator.modify_tags(acad)
        
        return Response(tag_serializer.data, status=status.HTTP_200_OK)

    except File.DoesNotExist:
        return Response({'error': 'Arquivo do AutoCAD não encontrado'}, status=status.HTTP_404_NOT_FOUND)

    # except Exception as e:
    #     return Response({'error': f'Erro ao modificar dados do AutoCAD: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
