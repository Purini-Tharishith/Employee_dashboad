package com.example.Project.management.dto;

import com.example.Project.management.entities.Task;
import lombok.Data;

import java.util.List;

@Data
public class UserTasksResponse {

    private List<Task> tasks;
}
