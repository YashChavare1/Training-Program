// Method Defines the behaviour/action that objects of class can perform.

public class MethodExample {
    // greeting() is an method/Behaviour
    public void greeting(String name) {
        System.out.println("Hello " + name);
    }
    
    public static void main(String[] args) {
        MethodExample me = new MethodExample();
        me.greeting("Yash");    
    }
}
