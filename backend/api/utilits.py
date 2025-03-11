import os

import pandas as pd

import pythoncom as pycom
import comtypes.client as ctypes_client
from comtypes import COMError

class AutocadManipulator:
    def __init__(self):
        self.acad_app = None
        self.acad_doc = None
        self.model_space = None

    def connect_to_autocad(self, temp_file_path):
        try:
            pycom.CoInitialize() # Get COM sources

            if not os.path.exists(temp_file_path):
                raise FileNotFoundError(f'Não foi possível encontrar o arquivo: {temp_file_path}')
            
            try:
                self.acad_app = ctypes_client.GetActiveObject('AutoCAD.Application')
            except Exception:
                self.acad_app = ctypes_client.CreateObject('AutoCAD.Application')

            self.acad_app.Visible = True
            self.acad_doc = self.acad_app.Documents.Open(temp_file_path)
        
        except COMError as e:
            raise e
        except Exception as e:
            raise e
        
    def extract_tags(self, acad_app):        

        def text_definition(text_obj):
            try:
                return text_obj.TextString
            except Exception:
                return text_obj.Text

        try:    
            self.model_space = acad_app.ModelSpace

            tag_data = [text_definition(obj) for obj in self.model_space if obj.ObjectName in ["AcDbText", "AcDbMText"]]

            print(tag_data)

            tag_df = pd.DataFrame(tag_data, columns=['old_tag'])
            tag_df = tag_df[tag_df['old_tag'].str.upper().str.contains('TECH')]
            
            if tag_df.empty:
                return 
            
            return tag_df['old_tag'].to_list()
        
        except Exception as e:
            raise e
        
        