# Bodhi - Code Challenge

## Objective

Create a responsive React / NextJS application that allows for user creation as well as management of created users / user details. The creation process should include a multi-step form, that persists data across the steps. User Management page should include a full featured table. Application should include at least one example of overriding / custom CSS. API Information is provided below storing / retrieving the users. The API will provide one default user, that should be prohibited from being able to be modified (User will be “Default User”). Information about the Default User will be randomly updated on the API side and events will be emitted through the SSE endpoint below. In addition, any create / update / delete to a user will also trigger an event.

### Points of Review may include but not limited to the following items

- State Management
- Code Organization
- Error Handling / Validation
- End User Experience

Feel free to add any additional logic / behavior / testing that you feel would contribute to a production ready application.

The task time allotment is three hours to complete as much as possible. The code should be submitted via a Github Repo. At minimum there should be an initial commit at the start of the challenge, and a final one when complete and/or at the three-hour mark. Additional commits throughout the challenge are suggested.

### API Information

```
URL - https://challenge.bodhilabs.dev
Auth Scheme: Basic
Login Credentials
  User: test
  Password: user
```

### Supported User Endpoints

- findAll – GET /users
- findOne – GET /users/resourceId
- create – POST /users
- update – PATCH /users/resourceId
- delete – DELETE /users/resourceId
- SSE for Live Updates – GET /users/events (This endpoint is not protected at this time)

### Create / Update DTO

```javascript
const roles = ['user', 'administrator'];

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;


  @IsString()
  @IsNotEmpty()
  lastName: string;


  @IsString()
  @IsNotEmpty()
  email: string;


  @IsString()
  @IsNotEmpty()
  password: string;


  @IsString()
  @IsNotEmpty()
  phoneNumber: string;


  @IsString()
  @IsIn(roles)
  @IsNotEmpty()
  role: string;


  @ValidateNested({ each: true })
  @Type((type) => CreateUserPreferencesDto)
  @IsObject()
  preferences: CreateUserPreferencesDto;
}


export class CreateUserPreferencesDto {
  @IsBoolean()
  receiveEmails: boolean;


  @IsBoolean()
  @IsOptional()
  receiveNotifications?: boolean;
}
```

### SSE Event Example(s)

```json
{
  "data": {
    "action": "created",
    "resourceId": "-nXP1hJZUYgOnyshPK9f",
    "data": {
      "_id": "-nXP1hJZUYgOnyshPK9f",
      "firstName": "Default",
      "lastName": "User3",
      "email": "testuser@gobodhi.com",
      "password": "somestring",
      "phoneNumber": "+14444444444",
      "role": "administrator",
      "preferences": { "receiveEmails": true },
      "createdById": "test",
      "createdAtDate": "2024-05-01T12:02:47.358Z",
      "updatedById": "test",
      "updatedAtDate": "2024-05-01T12:02:47.358Z"
    }
  }
}
```

```json
{
  "data": {
    "action": "updated",
    "resourceId": "-nXP1hJZUYgOnyshPK9f",
    "data": {
      "_id": "-nXP1hJZUYgOnyshPK9f",
      "firstName": "Default1",
      "lastName": "User3",
      "email": "testuser@gobodhi.com",
      "password": "somestring",
      "phoneNumber": "+14444444444",
      "role": "administrator",
      "preferences": { "receiveEmails": true },
      "createdById": "test",
      "createdAtDate": "2024-05-01T12:02:47.358Z",
      "updatedById": "test",
      "updatedAtDate": "2024-05-01T12:03:13.953Z"
    }
  }
}
```

```json
{ "data": { "action": "deleted", "resourceId": "-nXP1hJZUYgOnyshPK9f" } }
```

## Solution for Code Challenge

### Run app

1. After clone the repo, open a terminal and run:

   ```
   cd bodhi
   npm run dev
   ```

2. Create on the root path of the repository the **.env.local** file with the following content:

   ```
   NEXT_PUBLIC_API_USERNAME=test
   NEXT_PUBLIC_API_PASSWORD=user
   ```

3. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

4. Enjoy the app! 🙂
