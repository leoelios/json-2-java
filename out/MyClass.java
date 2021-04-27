package br.com.example;

import br.com.type.String;
import br.com.annotations.MyAnotation;
import br.com.type.Macaco;
import br.com.annotations.MyAnotation2;
import br.com.methods.OtherClass;
import br.com.test.JuNIT;
import br.com.interfaces.IMy;
import br.com.type.Test;

/**
 * Class automatic generated with json-2-java.
 * 
 * @Author Leonardo Elias de Oliveira
 */
@MyAnotation(admin = true)
public class MyClass extends OtherClass, JuNIT implements IMy {

    @MyAnotation(admin = true)
    private String myOwnAttribute;
    
    @MyAnotation2(admin = true)
    private Macaco otherAttribute;
    

    public MyClass() {
        inicializar();
    }
    
    public MyClass(String myOwnAttribute, Macaco otherAttribute) {
        this.myOwnAttribute = myOwnAttribute;
        this.otherAttribute = otherAttribute;
    }

    @MyAnotation()
    public String myMethod(Test test) throws ValidacaoException {
        // conteudo do método
    }

    @MyAnotation()
    public String myMethod(Test test)  {
        // conteudo do método
    }

    public String getMyOwnAttribute() {
        return this.myOwnAttribute;
    }
    
    public void setMyOwnAttribute(String myOwnAttribute) {
        this.myOwnAttribute = myOwnAttribute;
    }
    
    public Macaco getOtherAttribute() {
        return this.otherAttribute;
    }
    
    public void setOtherAttribute(Macaco otherAttribute) {
        this.otherAttribute = otherAttribute;
    }
    
  
}
