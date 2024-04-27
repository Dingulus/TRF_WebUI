from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
import serial

# Create your views here.

@api_view(['POST'])
def send_array(request):
    data_array = request.data.get('content', [])
    print(data_array)
    uart = serial.Serial('COM2', baudrate=9600, timeout=1)
    
    try:
        uart.write(data_array.encode())

    except Exception as e:
        print("Error:", e)
        return Response({'error': str(e)}, status=500)
    
    finally:
        uart.close()
    
    return Response({'message': 'Array received and sent through UART sucessfully'})