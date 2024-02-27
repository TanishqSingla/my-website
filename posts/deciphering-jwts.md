---
title: "Deciphering JWTs"
date: "2024-02-23"
---

## Introduction
Underpinning seamless logins across apps, JWTs are the workhorses of modern authentication. Their compact structure and built-in security make them ubiquitous in web development frameworks, simplifying token creation and management.
In a tweet exemplifying the growth of a software engineer's focus on understanding the "why" behind technologies, [Chinmay Naik](https://twitter.com/chinmay185) shared an anecdote [(link)](https://x.com/chinmay185/status/1759919896807559529?s=20) about early engineers not grasping the problems JWTs solve.
Hence the motivation to write this blog. If you wish to read more on JWT, the [JWT Handbook](https://auth0.com/resources/ebooks/jwt-handbook) is the go to resource.

## What are JWTs?
> **JSON** **W**eb **T**oken abbreviated as JWT is an open standard [RFC 7519](https://datatracker.ietf.org/doc/html/rfc7519) which defines a compact and self-contained way for securely transferring information between parties as JSON object.

If you too wondered what is `self-contained`, then let me explain. JWTs are self-contained as they contain their own information of how they were made e.g What encryption algorithm was used, when they were issued, when they will expire etc.

As mentioned in the definition, JWTs are used for *information transfer*, while we use them for authentication in our applications all we are doing actually is transferring information contained in a JSON format in a JWT.

Let us look at how this self-contained information is stored in a JWT.

## Structure of a JWT
Depending on the type of JWT the structure may vary, so before looking at the composition let's explore what are those different types.
- Unsecured JWTs
- Signed JWTs
- Encrypted JWTs
The information in a JWT is serialized compactly via encoding each part using Base64URL into printable strings and separating them using dots (.)
E.g

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.
TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ
```
The decoded header is:
```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```
The decoded payload is:
```json
{
  "sub": "1234567890",
  "name": "John Doe",
  "admin": true
}
```

### Unsecured and Signed JWTs
Unsigned or non-encrypted JWTs are termed as Unsecured JWTs. When you sign an unsecure JWT it becomes a signed JWT.
Both Unsecured and Signed JWT contain 
- header
- payload

The header and payload contains information termed as *claims*.
These *claims* establish information about the JWT such as the algorithm used, whether the JWT is signed or unsigned or encrypted, and how to parse the JWT.

**Signing the JWT**
When you sign the JWT using a private key, a signature is appended in the end separated by the (.) to the existing JWT containing the encoded header and payload.
The flow somewhat looks like this
```
encoded_header <- Base64Encode(header)
encoded_payload <- Base64Encode(payload)
signature <- Base64Encode(Encrypt("encoded_header" + "." + "encoded_payload", private_key))
jwt = encoded_header + "." encoded_payload + "." + signature
```
Here `Base64Encode` function encodes the input to Base64URL encoding and `Encrypt` function encrypts the input using private_key which is specified by you.

If you've been reading closely you would've noticed that we're appending the encrypted key while the header and payload are only encoded.

To put it simply, the header and payload of a JWT are transparent, implying they can be read by anyone. Hence only non-sensitive information are carried by Signed JWTs.

**Encrypted JWT**
To protect the body of a JWT, Encrypted JWTs are created. This type of JWT comprises of
- Header
- The encrypted key
- The initialization vector
- The encrypted data
- The authentication tag

## More on claims
This was all about the structure of a JWT, let's look at what does each structure contains.

Information contained inside a JWT is called a *claim*.

**Header claims**
For non-encrypted JWT the only mandatory claim is the `alg` claim which defines the main algorithm in use for encrypting/decrypting the JWT.

If the JWT doesn't use any encryption algorithm then the `alg` value should be "none". E.g
```
{
  "alg": "none"
}
```

**Payload claims**
There are 3 types of payload claims. The one provided by the JWT standard are called *Registered claims*.
These registered claims are:
- `iss` - from the word issuer, it contains a case-sensitive string or URI that uniquely identifies the party that issued the JWT.
- `sub` - from the word subject, it contains the information about the subject the JWT is issued for.
- `aud` - from the audience, It can be a single case-sensitive string or URI or an array of such values uniquely identifying the intended recipients for the JWT.
- `exp` - from the word expiration, contains the UNIX epoch time denoting the expiry time for the JWT.
- `nbf` - from *not before*, the opposite of `exp`, this claim contains the UNIX epoch time denoting the time from which the JWT will be valid.
- `iat` - from *issued at*, a number (UNIX epoch) denoting at what time the JWT was issued.
- `jti` - from *JWT ID* - a string representing unique identifier for JWT.

**Public and Private claims**
*Public claims* are those claims that are either registered with IANA JSON Web Token Claims, registry or named using a collision resistant name.
Whereas *private claims* are claims that are defined by the users. Because of their nature of being user defined, care must be taken to prevent collisions with public/registered claims.

## Conclusion
I hope through this blog now you know a little more about JWTs. 