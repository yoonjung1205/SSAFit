package com.ssafy.api.service;

import com.ssafy.db.entity.User;
import com.ssafy.mongodb.entity.*;
import com.ssafy.mongodb.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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

    @Autowired
    MongoUserRepository userRepository;

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

        // MongoDB에 Update


        if(user.getGender().name() == "FEMALE") {
            List<MongoUser> users = userRepository.findByUserId(user.getId());

            for(MongoUser u : users) {
                if(u.getLargecategory() == (Number)1) {
                    Optional<UserTop> userTop = userTopRepository.findById(u.getId());

                    userTop.get().setUserId(user.getId());
                    userTop.get().setUserWeight(user.getWeight());
                    userTop.get().setUserHeight(user.getHeight());
                    userTop.get().setUserName(user.getNickname());
                    userTop.get().setLargecategory(1);
                    userTop.get().setUserMale(0);
                    userTop.get().setUserFemale(1);
                    userTopRepository.save(userTop.get());
                }else if(u.getLargecategory() == (Number)2) {
                    Optional<UserOuter> userOuter = userOuterRepository.findById(u.getId());
                    userOuter.get().setUserId(user.getId());
                    userOuter.get().setUserWeight(user.getWeight());
                    userOuter.get().setUserHeight(user.getHeight());
                    userOuter.get().setUserName(user.getNickname());
                    userOuter.get().setLargecategory(2);
                    userOuter.get().setUserMale(0);
                    userOuter.get().setUserFemale(1);
                    userOuterRepository.save(userOuter.get());
                }else if(u.getLargecategory() == (Number)3) {
                    Optional<UserPants> userPants = userPantsRepository.findById(u.getId());
                    userPants.get().setUserId(user.getId());
                    userPants.get().setUserWeight(user.getWeight());
                    userPants.get().setUserHeight(user.getHeight());
                    userPants.get().setUserName(user.getNickname());
                    userPants.get().setLargecategory(3);
                    userPants.get().setUserMale(0);
                    userPants.get().setUserFemale(1);
                    userPantsRepository.save(userPants.get());
                }else if(u.getLargecategory() == (Number)4) {
                    Optional<UserOnepiece> userOnepiece = userOnepieceRepository.findById(u.getId());
                    userOnepiece.get().setUserId(user.getId());
                    userOnepiece.get().setUserWeight(user.getWeight());
                    userOnepiece.get().setUserHeight(user.getHeight());
                    userOnepiece.get().setUserName(user.getNickname());
                    userOnepiece.get().setLargecategory(4);
                    userOnepiece.get().setUserMale(0);
                    userOnepiece.get().setUserFemale(1);
                    userOnepieceRepository.save(userOnepiece.get());
                }else if(u.getLargecategory() == (Number)5) {
                    Optional<UserSkirt> userSkirt = userSkirtRepository.findById(u.getId());
                    userSkirt.get().setUserId(user.getId());
                    userSkirt.get().setUserWeight(user.getWeight());
                    userSkirt.get().setUserHeight(user.getHeight());
                    userSkirt.get().setUserName(user.getNickname());
                    userSkirt.get().setLargecategory(5);
                    userSkirt.get().setUserMale(0);
                    userSkirt.get().setUserFemale(1);
                    userSkirtRepository.save(userSkirt.get());
                }
            }

        }
        else {
            List<MongoUser> users = userRepository.findByUserId(user.getId());
            for(MongoUser u : users) {
                if(u.getLargecategory() == (Number)1) {
                    Optional<UserTop> userTop = userTopRepository.findById(u.getId());

                    userTop.get().setUserId(user.getId());
                    userTop.get().setUserWeight(user.getWeight());
                    userTop.get().setUserHeight(user.getHeight());
                    userTop.get().setUserName(user.getNickname());
                    userTop.get().setLargecategory(1);
                    userTop.get().setUserMale(1);
                    userTop.get().setUserFemale(0);
                    userTopRepository.save(userTop.get());
                }else if(u.getLargecategory() == (Number)2) {
                    Optional<UserOuter> userOuter = userOuterRepository.findById(u.getId());
                    userOuter.get().setUserId(user.getId());
                    userOuter.get().setUserWeight(user.getWeight());
                    userOuter.get().setUserHeight(user.getHeight());
                    userOuter.get().setUserName(user.getNickname());
                    userOuter.get().setLargecategory(2);
                    userOuter.get().setUserMale(1);
                    userOuter.get().setUserFemale(0);
                    userOuterRepository.save(userOuter.get());
                }else if(u.getLargecategory() == (Number)3) {
                    Optional<UserPants> userPants = userPantsRepository.findById(u.getId());
                    userPants.get().setUserId(user.getId());
                    userPants.get().setUserWeight(user.getWeight());
                    userPants.get().setUserHeight(user.getHeight());
                    userPants.get().setUserName(user.getNickname());
                    userPants.get().setLargecategory(3);
                    userPants.get().setUserMale(1);
                    userPants.get().setUserFemale(0);
                    userPantsRepository.save(userPants.get());
                }
            }

        }
    }
}
