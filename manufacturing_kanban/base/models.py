from django.db import models

# Create your models here.

class Location(models.Model):
    name= models.CharField(max_length=128)
    sequence= models.PositiveSmallIntegerField(default=0)

    def __str__(self) -> str:
        return self.name

class Part(models.Model):
    name= models.CharField(max_length=128)
    description= models.TextField()

    def __str__(self) -> str:
        return self.name

class WorkOrder(models.Model):
    name= models.CharField(max_length=128)
    priority= models.PositiveSmallIntegerField(default=0)
    location= models.ForeignKey(Location, on_delete= models.CASCADE)
    part= models.ForeignKey(Part, on_delete= models.CASCADE)
    
    def __str__(self) -> str:
        return self.name

