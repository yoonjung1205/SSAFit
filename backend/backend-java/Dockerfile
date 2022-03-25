# JDK8 base image
FROM openjdk:8-jdk

# Add Author info
LABEL maintainer="dudrl0944@gmail.com"

ARG JAR_FILE=./build/libs/ssafy-web-project-1.0-SNAPSHOT.jar

# copy jar
COPY ${JAR_FILE} app.jar

# Timezone setting
ARG DEBIAN_FRONTEND=noninteractive
ENV TZ=Asia/Seoul
RUN apt-get install -y tzdata

# run
ENTRYPOINT ["java","-jar","app.jar"]
