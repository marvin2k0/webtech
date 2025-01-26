import {Component, inject, Input} from '@angular/core';
import {UserRole} from '../../model/user.role.model';
import {UserDetails} from '../admin-dashboard/admin-dashboard.component';
import {FormsModule} from '@angular/forms';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-role-selector',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './role-selector.component.html',
  styleUrl: './role-selector.component.css'
})
export class RoleSelectorComponent {
  @Input() user!: UserDetails
  userService: UserService = inject(UserService)
  roles: UserRole[] = UserRole.roles

  onRoleChange(event: Event) {
    const newRole = (event.target as HTMLSelectElement).value;
    this.userService.updateRole(newRole, this.user._id).subscribe()
  }
}
