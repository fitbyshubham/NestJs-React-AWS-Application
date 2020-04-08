import { Repository, EntityRepository } from "typeorm";
import { Task } from "./task.entity";
import { CreateTaskDto } from "./create-task.dto";
import { TaskStatus } from "./task-status.enum";
import { GetTasksFilterDto } from "./get-tasks-filter.dto";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
    
    

async getTasks(filterDto:GetTasksFilterDto):Promise<Task[]> {

const {status,search}=filterDto
    
const query=this.createQueryBuilder('task')

if(status){

query.andWhere('task.status = :status',{status})


}

if(search){

query.andWhere('task.title LIKE :search OR task.description LIKE :search',{search : `%${search}%` })


}

const task= await  query.getMany()

return task


}


async createTask(createTaskDto:CreateTaskDto): Promise<Task> {

    const {title, description}=createTaskDto

    const task=new Task()
  
    task.title = title
    task.description = description
    task.status=TaskStatus.OPEN
    await task.save()
    
    return task


} 


}