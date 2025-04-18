import os
import re

import pandas as pd

from pyautocad import Autocad
import pythoncom as pycom
from comtypes import COMError

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

        text_dataframe = pd.DataFrame(text_objects, columns=['old_tag'])
        text_dataframe = text_dataframe[text_dataframe['old_tag'].str.upper().str.contains('TECH')].drop_duplicates(ignore_index=True)
        text_dataframe['old_tag_regex'] = (
            text_dataframe['old_tag']
            .map(lambda x: re.sub(r'(?:[\\]{1,2}[a-zA-Z]+[\d]+[.][\d]+)|([\\]{1,2}px[\w]+)|([^\w\s\\n-])|([\\]{1,2}[^\\n\\P][\w]+)', '', str(x)))
            .map(lambda x: re.sub(r'\\P|\n', '<br>', str(x))))

        return text_dataframe.to_json(orient="records")

    def modify_tags(self, acad):
        if not acad:
            raise RuntimeError('O AutoCAD não está conectado corretamente, se conecte primeiro!')
        
        for text_object in acad.iter_objects(['Text']):
            try:
                # Try to get Tag
                tag = Tag.objects.get(old_tag=str(text_object.TextString))
                
                current_text = str(text_object.TextString)

                # Setting Tag elements
                old_tag_regex = tag.old_tag_regex
                new_tag = tag.new_tag
                
                # Separating the string in array
                old_tag_regex_array, new_tag_array = [re.split(r'\s+|<[^\W]+>|[-]', tag_attr) for tag_attr in [old_tag_regex, new_tag]]
                
                # Adding the TECH prefix
                new_tag_array.insert(0, 'TECH')

                # Loop for each item in the arrays
                for old_tag_content, new_tag_content in zip(old_tag_regex_array, new_tag_array):
                    index = current_text.rfind(old_tag_content)
                    current_text = current_text[:index] + current_text[index:].replace(old_tag_content, new_tag_content, 1)

                # Save the mew text obj
                text_object.TextString = current_text

            except Tag.DoesNotExist:
                continue