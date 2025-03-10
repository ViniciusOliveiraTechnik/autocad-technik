import comtypes.client as ctypes_client
import pythoncom
import os
import threading
import time

class EventSink:
    def __init__(self):
        self.exit = False

    def _DAcadApplicationEvents_EndCommand(self, command_name):
        """Escuta o comando de fechamento."""
        if command_name == 'CLOSE':
            print('Arquivo fechado')
            self.exit = True

class AutocadManipulator:
    def __init__(self, temp_file_path):
        self.temp_file_path = temp_file_path
        self.acad_app = None
        self.acad_doc = None
        self.sink = EventSink()

    def connect_to_autocad(self):
        try:
            pythoncom.CoInitialize()

            if not os.path.exists(self.temp_file_path):
                raise FileNotFoundError(f'Não foi possível encontrar o arquivo no local {self.temp_file_path}')
            
            try:
                self.acad_app = ctypes_client.GetActiveObject('AutoCAD.Application')
            except Exception:
                self.acad_app = ctypes_client.CreateObject('AutoCAD.Application')
            
            self.acad_app.Visible = True

            self.acad_doc = self.acad_app.Documents.Open(self.temp_file_path)

            connection = ctypes_client.GetEvents(self.acad_app, self.sink)

            while not self.sink.exit:
                pythoncom.PumpWaitingMessages()
                time.sleep(0.1)

            pythoncom.CoUninitialize()

        except Exception as e:
            print(f'Erro: {e}')

# Exemplo de execução
if __name__ == "__main__":

    dwg_path = r"c:\Users\vimol\Technik\Clientes - Documentos\AI\AutoCAD\Alltech\Automação de Desenho fase 1\draws\teste.dwg"

    manipulator = AutocadManipulator(dwg_path)

    autocad_thread = threading.Thread(target=manipulator.connect_to_autocad)
    autocad_thread.start()

    