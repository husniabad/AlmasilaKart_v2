from django.urls import path
from base.views import cart_views as views


urlpatterns = [
    path('',views.getCartItems, name="cart-items" ),
    path('<str:pk>/', views.getCartItem, name="cart-item"),

]