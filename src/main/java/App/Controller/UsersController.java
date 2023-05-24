package App.Controller;

import App.Custom.CustomEmployee;
import App.Custom.CustomRecord;
import App.Model.Procedure;
import App.Model.Record;
import App.Model.Users;
import App.Model.enums.Role;
import App.Service.UsersService;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/users")
public class UsersController {
    private final UsersService usersService;

    public UsersController(UsersService usersService) {
        this.usersService = usersService;
    }

    @GetMapping
    public List<Users> getUsers() {
        return usersService.findAllUsers();
    }

    @GetMapping("/{id}")
    public Users getAdmin(@PathVariable Integer id) {
        return usersService.findUser(id);
    }

    @GetMapping("/user/{id}/{login}/{password}")
    public Users getUser(@PathVariable Integer id,@PathVariable String login,@PathVariable String password) {
        return usersService.findUserByIdLoginPassword(id,login,password);
    }

    @GetMapping("/employee/{id}")
    public Users getEmployee(@PathVariable Integer id) {
        return usersService.findUser(id);
    }

    @GetMapping("/user/employees")
    public List<CustomEmployee>  getEmployees() {
        List<CustomEmployee> tmp = new ArrayList<>();
        List<Users> employees = usersService.getUsersByRole(Role.ROLE_EMPLOYEE);

        for(int i = 0; i < employees.size(); i++){
             tmp.add(new CustomEmployee(employees.get(i).getId(), employees.get(i).getFcs()));
        }
        return tmp;
    }

    @GetMapping("/employees")
    public List<Users>  getEmployeesA() {
        List<Users> employees = usersService.getUsersByRole(Role.ROLE_EMPLOYEE);
        return employees;
    }

    @GetMapping("/users")
    public List<Users>  getUsersA() {
        List<Users> users = usersService.getUsersByRole(Role.ROLE_USER);
        return users;
    }

    @PostMapping
    public Users setUser(@RequestBody Users user) {
        return usersService.saveUser(user);
    }

    @PostMapping("/registration")
    public Users registration(@RequestBody Users user) {
        return usersService.saveUser(user);
    }

    @PutMapping
    public Users updateUsers(@RequestBody Users user){
        return usersService.updateUser(user);
    }

    @PutMapping("/user")
    public Users updateUser(@RequestBody Users user){
        return usersService.updateUser(user);
    }

    @DeleteMapping("/{id}")
    public Users deleteUser(@PathVariable Integer id){
        return usersService.deleteUser(id);
    }

}

