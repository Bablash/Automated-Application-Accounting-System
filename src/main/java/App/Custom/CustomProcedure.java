package App.Custom;

import lombok.Data;

@Data
public class CustomProcedure {
    private Integer id;
    private String name;

    public CustomProcedure(int id, String name){
        this.id = id;
        this.name = name;
    }
}
