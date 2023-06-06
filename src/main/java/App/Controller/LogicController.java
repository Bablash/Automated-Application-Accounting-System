package App.Controller;

import App.Service.UsersService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.security.Principal;

@Controller
@RequiredArgsConstructor
public class LogicController {

    private final UsersService userService;

    @GetMapping("/")
    public String home(Principal principal, Model model) {
        model.addAttribute("user", userService.getUserByPrincipal(principal));
        return "home";
    }

    @GetMapping("/login")
    public String login(Principal principal, Model model) {
        model.addAttribute("user", userService.getUserByPrincipal(principal));
        return "login";
    }

    @GetMapping("/account")
    public String account(Principal principal, Model model) {
        model.addAttribute("user", userService.getUserByPrincipal(principal));
        return "account";
    }

    @GetMapping("/registration")
    public String registration(Principal principal, Model model) {
        model.addAttribute("user", userService.getUserByPrincipal(principal));
        return "registration";
    }
    @GetMapping("/procedure_employee")
    public String procedure_employee(Principal principal, Model model) {
        model.addAttribute("user", userService.getUserByPrincipal(principal));
        return "procedure_employee";
    }
    @GetMapping("/record")
    public String record(Principal principal, Model model) {
        model.addAttribute("user", userService.getUserByPrincipal(principal));
        return "record";
    }
    @GetMapping("/schedule")
    public String schedule(Principal principal, Model model) {
        model.addAttribute("user", userService.getUserByPrincipal(principal));
        return "schedule";
    }

    @GetMapping("/user")
    public String user(Principal principal, Model model) {
        model.addAttribute("user", userService.getUserByPrincipal(principal));
        return "users";
    }

    @GetMapping("/procedure")
    public String procedure(Principal principal, Model model) {
        model.addAttribute("user", userService.getUserByPrincipal(principal));
        return "procedure";
    }

    @GetMapping("/employee_record")
    public String employee_record(Principal principal, Model model) {
        model.addAttribute("user", userService.getUserByPrincipal(principal));
        return "employee_record";
    }

    @GetMapping("/employee_schedule")
    public String employee_schedule(Principal principal, Model model) {
        model.addAttribute("user", userService.getUserByPrincipal(principal));
        return "employee_schedule";
    }

    @GetMapping("/online_record")
    public String online_record(Principal principal, Model model) {
        model.addAttribute("user", userService.getUserByPrincipal(principal));
        return "online_record";
    }

    @GetMapping("/statistic")
    public String statistic(Principal principal, Model model) {
        model.addAttribute("user", userService.getUserByPrincipal(principal));
        return "statistic";
    }
}
