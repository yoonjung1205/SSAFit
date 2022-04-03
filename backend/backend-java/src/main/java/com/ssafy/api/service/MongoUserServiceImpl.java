package com.ssafy.api.service;

import com.ssafy.db.entity.User;
import com.ssafy.mongodb.entity.*;
import com.ssafy.mongodb.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MongoUserServiceImpl  implements MongoUserService{

    @Autowired
    DepartmentRepository departmentRepository;

    @Autowired
    UserOnepieceRepository userOnepieceRepository;

    @Autowired
    UserOuterRepository userOuterRepository;

    @Autowired
    UserPantsRepository userPantsRepository;

    @Autowired
    UserSkirtRepository userSkirtRepository;

    @Autowired
    UserTopRepository userTopRepository;


    @Override
    public void createUser(User user) {

        // MongoDB에 Insert

        UserTop userTop = new UserTop();
        userTop.setUserId(user.getId());
        userTop.setUserWeight(user.getWeight());
        userTop.setUserHeight(user.getHeight());
        userTop.setUserName(user.getNickname());
        userTop.setLargecategory(1);

        UserOuter userOuter = new UserOuter();
        userOuter.setUserId(user.getId());
        userOuter.setUserWeight(user.getWeight());
        userOuter.setUserHeight(user.getHeight());
        userOuter.setUserName(user.getNickname());
        userOuter.setLargecategory(2);

        UserPants userPants = new UserPants();
        userPants.setUserId(user.getId());
        userPants.setUserWeight(user.getWeight());
        userPants.setUserHeight(user.getHeight());
        userPants.setUserName(user.getNickname());
        userPants.setLargecategory(3);

        UserOnepiece userOnepiece = new UserOnepiece();
        userOnepiece.setUserId(user.getId());
        userOnepiece.setUserWeight(user.getWeight());
        userOnepiece.setUserHeight(user.getHeight());
        userOnepiece.setUserName(user.getNickname());
        userOnepiece.setLargecategory(4);

        UserSkirt userSkirt = new UserSkirt();
        userSkirt.setUserId(user.getId());
        userSkirt.setUserWeight(user.getWeight());
        userSkirt.setUserHeight(user.getHeight());
        userSkirt.setUserName(user.getNickname());
        userSkirt.setLargecategory(5);



        if(user.getGender().name() == "FEMALE") {
            userOnepiece.setUserFemale(1);
            userOnepiece.setUserMale(0);
            userOuter.setUserFemale(1);
            userOuter.setUserMale(0);
            userPants.setUserFemale(1);
            userPants.setUserMale(0);
            userSkirt.setUserFemale(1);
            userSkirt.setUserMale(0);
            userTop.setUserFemale(1);
            userTop.setUserMale(0);
        }
        else {
            userOnepiece.setUserFemale(0);
            userOnepiece.setUserMale(1);
            userOuter.setUserFemale(0);
            userOuter.setUserMale(1);
            userPants.setUserFemale(0);
            userPants.setUserMale(1);
            userSkirt.setUserFemale(0);
            userSkirt.setUserMale(1);
            userTop.setUserFemale(0);
            userTop.setUserMale(1);
        }

        if(user.getGender().name() == "FEMALE") {
            userOnepieceRepository.save(userOnepiece);
            userOuterRepository.save(userOuter);
            userPantsRepository.save(userPants);
            userSkirtRepository.save(userSkirt);
            userTopRepository.save(userTop);

        }else {
            userOuterRepository.save(userOuter);
            userPantsRepository.save(userPants);
            userTopRepository.save(userTop);
        }

    }

    @Override
    public void updateUser(User user) {

        // MongoDB에 Insert





        if(user.getGender().name() == "FEMALE") {
            UserTop userTop = userTopRepository.findByUserName(user.getNickname());
            userTop.setUserId(user.getId());
            userTop.setUserWeight(user.getWeight());
            userTop.setUserHeight(user.getHeight());
            userTop.setUserName(user.getNickname());
            userTop.setLargecategory(1);

            UserOuter userOuter = userOuterRepository.findByUserName(user.getNickname());
            userOuter.setUserId(user.getId());
            userOuter.setUserWeight(user.getWeight());
            userOuter.setUserHeight(user.getHeight());
            userOuter.setUserName(user.getNickname());
            userOuter.setLargecategory(2);

            UserPants userPants = userPantsRepository.findByUserName(user.getNickname());
            userPants.setUserId(user.getId());
            userPants.setUserWeight(user.getWeight());
            userPants.setUserHeight(user.getHeight());
            userPants.setUserName(user.getNickname());
            userPants.setLargecategory(3);

            UserOnepiece userOnepiece = userOnepieceRepository.findByUserName(user.getNickname());
            userOnepiece.setUserId(user.getId());
            userOnepiece.setUserWeight(user.getWeight());
            userOnepiece.setUserHeight(user.getHeight());
            userOnepiece.setUserName(user.getNickname());
            userOnepiece.setLargecategory(4);

            UserSkirt userSkirt = userSkirtRepository.findByUserName(user.getNickname());
            userSkirt.setUserId(user.getId());
            userSkirt.setUserWeight(user.getWeight());
            userSkirt.setUserHeight(user.getHeight());
            userSkirt.setUserName(user.getNickname());
            userSkirt.setLargecategory(5);

            userOnepiece.setUserFemale(1);
            userOnepiece.setUserMale(0);
            userOuter.setUserFemale(1);
            userOuter.setUserMale(0);
            userPants.setUserFemale(1);
            userPants.setUserMale(0);
            userSkirt.setUserFemale(1);
            userSkirt.setUserMale(0);
            userTop.setUserFemale(1);
            userTop.setUserMale(0);
            userOnepieceRepository.save(userOnepiece);
            userOuterRepository.save(userOuter);
            userPantsRepository.save(userPants);
            userSkirtRepository.save(userSkirt);
            userTopRepository.save(userTop);
        }
        else {
            UserTop userTop = userTopRepository.findByUserName(user.getNickname());
            userTop.setUserId(user.getId());
            userTop.setUserWeight(user.getWeight());
            userTop.setUserHeight(user.getHeight());
            userTop.setUserName(user.getNickname());
            userTop.setLargecategory(1);

            UserOuter userOuter = userOuterRepository.findByUserName(user.getNickname());
            userOuter.setUserId(user.getId());
            userOuter.setUserWeight(user.getWeight());
            userOuter.setUserHeight(user.getHeight());
            userOuter.setUserName(user.getNickname());
            userOuter.setLargecategory(2);

            UserPants userPants = userPantsRepository.findByUserName(user.getNickname());
            userPants.setUserId(user.getId());
            userPants.setUserWeight(user.getWeight());
            userPants.setUserHeight(user.getHeight());
            userPants.setUserName(user.getNickname());
            userPants.setLargecategory(3);

            userOuter.setUserFemale(0);
            userOuter.setUserMale(1);
            userPants.setUserFemale(0);
            userPants.setUserMale(1);

            userTop.setUserFemale(0);
            userTop.setUserMale(1);
            userOuterRepository.save(userOuter);
            userPantsRepository.save(userPants);
            userTopRepository.save(userTop);
        }
    }
}
