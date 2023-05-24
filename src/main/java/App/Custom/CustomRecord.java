package App.Custom;

import lombok.Data;

import java.sql.Date;
import java.sql.Time;

@Data
public class CustomRecord {
    private Integer id;
    private Date date;
    private Time time;
    private String status;
    private String procedure_name;
    private String employee_fcs;
    private String user_fcs;

    public CustomRecord(int id, Date date, Time time, String status, String procedure_name, String employee_fcs, String user_fcs){
        this.id = id;
        this.date = date;
        this.time = time;
        this.status = status;
        this.procedure_name = procedure_name;
        this.employee_fcs = employee_fcs;
        this.user_fcs = user_fcs;
    }
}
