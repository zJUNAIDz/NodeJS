class Number:
    Multiplier = 10

    def __init__(self, x, y):
        self.x = x
        self.y = y

    def add(self):
        return (self.x+self.y)

    @classmethod
    def multiply(cls, a):
        return (cls.Multiplier*a)

    @staticmethod
    def subtract(b, c):
        return (b-c)

    @property
    def value(self):
        return (self.x, self.y)

    def set_value(self, x, y):
        self.x = x
        self.y = y

    def delt_value(self):
        del self.x
        del self.y


N = Number(20, 30)
print("Addition=", N.add())
print("Product=", N.multiply(5))
print("Difference=", Number.subtract(9, 6))
print("Property value=", N.value)
print("Set value=", N.set_value(4, 3))
print("Property value=", N.value)
print("Deleted value=", N.delt_value())
# print("Property value=", N.value)
