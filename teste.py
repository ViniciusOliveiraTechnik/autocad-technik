import pyautocad

acad = pyautocad.Autocad(create_if_not_exists=True)
acad.app.Documents.Open(r"c:\Users\Vinicius\Technik\Clientes - Documentos\AI\AutoCAD\Alltech\Automação de Desenho fase 1\draws\Circulo.dwg")

for obj in acad.iter_objects():
    print(obj)