import os
import re

import pandas as pd

try:
    from pyautocad import Autocad
    import pythoncom as pycom
    from comtypes import COMError
except ModuleNotFoundError:
    pycom = None

from .models import *
from .serializers import *
class AutocadManipulator:
    def __init__(self):
        pass

    def connect_to_autocad(self, temp_file_path):
        try:
            pycom.CoInitialize() # Send the COM sources tho the system
            
            acad = Autocad(create_if_not_exists=True)
            acad.app.Documents.Open(temp_file_path)

            return acad # Return the acad document
        
        except COMError as err:
            raise err
        except Exception as err:
            raise err
        
    def extract_tags(self, acad):
        if not acad:
            raise RuntimeError("O AutoCAD não está conectado corretamente, se conecte primeiro!")
        
        text_objects = [obj.TextString for obj in acad.iter_objects(['Text'])]

        # ESSA PARTE AINDA NÃO FOI TOTALMENTE FINALIZADA
        text_dataframe = pd.DataFrame(text_objects, columns=['old_tag'])
        text_dataframe = text_dataframe[text_dataframe['old_tag'].str.upper().str.contains('TECH')].drop_duplicates(ignore_index=True)
        text_dataframe['old_tag_regex'] = text_dataframe['old_tag']

        return text_dataframe.to_json(orient="records")

    def modify_tags(self, acad):
        if not acad:
            raise RuntimeError('O AutoCAD não está conectado corretamente, se conecte primeiro!')
        
        for text_object in acad.iter_objects(['Text']):
            try:
                tag = Tag.objects.get(old_tag=str(text_object.TextString))
                
                if tag.new_tag:
                    text_object.TextString = str(text_object.TextString).replace(tag.old_tag, tag.new_tag)

            except Tag.DoesNotExist:
                continue