from django.shortcuts import render

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from base.models import Product, Order, OrderItem, ShippingAddress,Cart
from base.serializers import CartSerializer

from rest_framework import status
from datetime import datetime



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getCartItems(request):
    user = request.user
    cart = Cart.objects.filter(user=user)
    serializer = CartSerializer(cart, many=True)
    print("get")
    return Response({"cart": serializer.data})


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getCartItem(request, pk):
    product = Cart.objects.get(_id=pk)
    serializer = CartSerializer(product, many=False)
    return Response(serializer.data)
