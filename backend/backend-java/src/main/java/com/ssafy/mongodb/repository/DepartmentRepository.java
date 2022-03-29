package com.ssafy.mongodb.repository;

import com.ssafy.mongodb.entity.Department;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface DepartmentRepository  extends MongoRepository<Department,String> {

    @Query(value = "{'employees.name': ?0}", fields = "{'employees' : 0}")
    Department findDepartmentByEmployeeName(String empName);

    List findDepartmentByName(String name);
}