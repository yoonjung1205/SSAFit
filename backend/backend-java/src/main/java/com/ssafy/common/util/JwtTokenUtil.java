package com.ssafy.common.util;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.*;

import com.auth0.jwt.exceptions.InvalidClaimException;
import com.ssafy.db.repository.UserRefreshTokenRepository;
import com.ssafy.db.repository.UserRepository;
import io.jsonwebtoken.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Base64;
import java.util.Date;
import java.util.List;

import static com.google.common.collect.Lists.newArrayList;

/**
 * jwt 토큰 유틸 정의.
 */
@Component
public class JwtTokenUtil {
    private static String secretKey;
    private static Integer expirationTime;

    public static final String TOKEN_PREFIX = "Bearer ";
    public static final String HEADER_STRING = "Authorization";
    public static final String REFRESH_STRING = "Refresh";
    public static final String ISSUER = "ssafy.com";

    @Autowired
    UserRefreshTokenRepository tokenRepository;

    @Autowired
	public JwtTokenUtil(@Value("${jwt.secret}") String secretKey, @Value("${jwt.expiration}") Integer expirationTime) {
		this.secretKey = secretKey;
		this.expirationTime = expirationTime;
	}

    // RefreshToken 존재유무 확인
    public boolean existsRefreshToken(String refreshToken) {
        return tokenRepository.existsByRefreshToken(refreshToken);
    }

    // 토큰에서 회원 정보 추출
    public String getUserEmail(String token) {
        return Jwts.parserBuilder().setSigningKey(secretKey.getBytes()).build().parseClaimsJws(token).getBody().getSubject();
    }

    // 토큰에서 회원 정보 추출
    public int getUserId(String token) {
        return (int) Jwts.parserBuilder().setSigningKey(secretKey.getBytes()).build().parseClaimsJws(token).getBody().get("id");
    }

	public void setExpirationTime() {
    		//JwtTokenUtil.expirationTime = Integer.parseInt(expirationTime);
    		JwtTokenUtil.expirationTime = expirationTime;
	}

    public boolean validateToken(String token) {
        try {

            System.out.println("ddddddddddddddddddddddddddddddd");
            Jws<Claims> claims = Jwts.parserBuilder().setSigningKey(secretKey.getBytes()).build().parseClaimsJws(token);


            if (!claims.getBody().getExpiration().before(new Date())) {
                return false;
            }

            return true;
        } catch (ExpiredJwtException e) {
            System.out.println("sssssssssssssssssssssssssssssss");
            return true;

        }
    }

	public static JWTVerifier getVerifier() {
        return JWT
                .require(Algorithm.HMAC512(secretKey.getBytes()))
                .withIssuer(ISSUER)
                .build();
    }
    
    public static String getToken(String email, String userName, String role, Long id, int expireTime) {
        // refresh_token 172800000, access_token  1800000
        Date now = new Date();
    		Date expires = new Date(now.getTime() + expireTime);
        return JWT.create()
                .withSubject(email)
                .withExpiresAt(expires)
                .withIssuer(ISSUER)
                .withClaim("nickname",userName)
                .withClaim("role",role)
                .withClaim("id",id)
                .withIssuedAt(Date.from(LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant()))
                .sign(Algorithm.HMAC512(secretKey.getBytes()));
    }

    public static String getOAuthToken(String email, String userName, String role, Long id, String url,int height,int weight, int gender, int expireTime) {
        // refresh_token 172800000, access_token  1800000
        Date now = new Date();
        Date expires = new Date(now.getTime() + expireTime);
        return JWT.create()
                .withSubject(email)
                .withExpiresAt(expires)
                .withIssuer(ISSUER)
                .withClaim("nickname",userName)
                .withClaim("height", height)
                .withClaim("weight",weight)
                .withClaim("gender",gender)
                .withClaim("role",role)
                .withClaim("id",id)
                .withClaim("profileImage",url)
                .withClaim("auth", 0)
                .withClaim("oauth", 1)
                .withIssuedAt(Date.from(LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant()))
                .sign(Algorithm.HMAC512(secretKey.getBytes()));
    }

    public static String getAuthToken(String email, String userName, String role, Long id, String url,int height,int weight, int gender, int expireTime) {
        // refresh_token 172800000, access_token  1800000
        Date now = new Date();
        Date expires = new Date(now.getTime() + expireTime);
        return JWT.create()
                .withSubject(email)
                .withExpiresAt(expires)
                .withIssuer(ISSUER)
                .withClaim("nickname",userName)
                .withClaim("height", height)
                .withClaim("weight",weight)
                .withClaim("gender",gender)
                .withClaim("role",role)
                .withClaim("id",id)
                .withClaim("profileImage",url)
                .withClaim("auth", 1)
                .withClaim("oauth", 0)
                .withIssuedAt(Date.from(LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant()))
                .sign(Algorithm.HMAC512(secretKey.getBytes()));
    }

    public static String getToken(String email, String userName, String role, Long id, String url,int height,int weight, int gender, int expireTime) {
        // refresh_token 172800000, access_token  1800000
        Date now = new Date();
        Date expires = new Date(now.getTime() + expireTime);
        return JWT.create()
                .withSubject(email)
                .withExpiresAt(expires)
                .withIssuer(ISSUER)
                .withClaim("nickname",userName)
                .withClaim("height", height)
                .withClaim("weight",weight)
                .withClaim("gender",gender)
                .withClaim("role",role)
                .withClaim("id",id)
                .withClaim("profileImage",url)
                .withIssuedAt(Date.from(LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant()))
                .sign(Algorithm.HMAC512(secretKey.getBytes()));
    }

    public static String getToken(Instant expires, String email) {
        return JWT.create()
                .withSubject(email)
                .withExpiresAt(Date.from(expires))
                .withIssuer(ISSUER)
                .withIssuedAt(Date.from(LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant()))
                .sign(Algorithm.HMAC512(secretKey.getBytes()));
    }
    public static String getToken(String email,String role, String userName) {
        Date expires = JwtTokenUtil.getTokenExpiration(expirationTime);
        return JWT.create()
                .withSubject(email)
                .withExpiresAt(expires)
                .withIssuer(ISSUER)
                .withClaim("name",userName)
                .withClaim("role",role)
                .withIssuedAt(Date.from(LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant()))
                .sign(Algorithm.HMAC512(secretKey.getBytes()));
    }
    public static Date getTokenExpiration(int expirationTime) {
    		Date now = new Date();
    		return new Date(now.getTime() + expirationTime);
    }

    public static void handleError(String token) {
        JWTVerifier verifier = JWT
                .require(Algorithm.HMAC512(secretKey.getBytes()))
                .withIssuer(ISSUER)
                .build();

        try {
            verifier.verify(token.replace(TOKEN_PREFIX, ""));
        } catch (AlgorithmMismatchException ex) {
            throw ex;
        } catch (InvalidClaimException ex) {
            throw ex;
        } catch (SignatureGenerationException ex) {
            throw ex;
        } catch (SignatureVerificationException ex) {
            throw ex;
        } catch (TokenExpiredException ex) {
            throw ex;
        } catch (JWTCreationException ex) {
            throw ex;
        } catch (JWTDecodeException ex) {
            throw ex;
        } catch (JWTVerificationException ex) {
            throw ex;
        } catch (Exception ex) {
            throw ex;
        }
    }

    public static void handleError(JWTVerifier verifier, String token) {
        try {
            verifier.verify(token.replace(TOKEN_PREFIX, ""));
        } catch (AlgorithmMismatchException ex) {
            throw ex;
        } catch (InvalidClaimException ex) {
            throw ex;
        } catch (SignatureGenerationException ex) {
            throw ex;
        } catch (SignatureVerificationException ex) {
            throw ex;
        } catch (TokenExpiredException ex) {
            throw ex;
        } catch (JWTCreationException ex) {
            throw ex;
        } catch (JWTDecodeException ex) {
            throw ex;
        } catch (JWTVerificationException ex) {
            throw ex;
        } catch (Exception ex) {
            throw ex;
        }
    }
}
