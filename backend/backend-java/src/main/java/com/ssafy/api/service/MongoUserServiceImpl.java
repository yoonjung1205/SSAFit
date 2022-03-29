package com.ssafy.api.service;

import com.ssafy.mongodb.entity.Department;
import com.ssafy.mongodb.repository.DepartmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MongoUserServiceImpl  implements MongoUserService{

    @Autowired
    DepartmentRepository departmentRepository;

    @Override
    public void createUser(Department department) {


        // MongoDB에 Insert
        departmentRepository.insert(department);

    }
}
