from pyautocad import Autocad
import pythoncom

class AutoCadManipulator:
    def __init__(self):
        self.active_document = None
        self.model_space = None

    def auth_autocad(self, file_path):
        try:
            pythoncom.CoInitialize()

            acad = Autocad(create_if_not_exists=True)
            acad.Application.Documents.Open(file_path)

            doc = acad.ActiveDocument
            model_space = doc.ModelSpace

            self.active_document = acad
            self.model_space = model_space
            
            return {'success': 'AutoCAD Client created!', 'error': None}
        
        except Exception as error:
            return {'success': None, 'error': str(error)}

    def get_tags(acad):
        tags = [
            text.TextString for text in acad.iter_objects(['TEXT']) if str(text.TextString).strip().startswith('TECH')
        ]

        return tags
    