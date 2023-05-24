package App.Custom;

import lombok.Data;

import java.sql.Date;
import java.sql.Time;

@Data
public class CustomEmployee {
    private Integer id;
    private String fcs;

    public CustomEmployee(int id, String employee_fcs){
        this.id = id;
        this.fcs = employee_fcs;
    }
}
