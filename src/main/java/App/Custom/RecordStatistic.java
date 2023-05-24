package App.Custom;

import lombok.Data;

@Data
public class RecordStatistic {
    private Integer procedure_id;
    private Long count;

    public RecordStatistic(Integer procedure_id, Long count) {
        this.procedure_id = procedure_id;
        this.count = count;
    }
}
