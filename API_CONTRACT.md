# 📑 CYBER-MORPH API CONTRACT (Aligned with Backend v1)

This document defines the exact JSON structures returned by the FastAPI backend. Use this as the reference when writing the Frontend API client.

---

## 1. Authentication

**Endpoint**: `POST /auth/login`  
**Backend Response**:

```json
{
  "access_token": "JWT_STRING",
  "token_type": "bearer",
  "role": "player | educator | admin"
}
```

**Note**: After receiving the token, the frontend should store it and fetch the user profile using the endpoints below.

---

## 2. User Profiles

**Endpoint**: `GET /players/me` (for Players)  
**Endpoint**: `GET /web-users/me` (for Educators/Admins)

**Player Response**:

```json
{
  "profile_id": "uuid-string",
  "user_id": "uuid-string",
  "username": "NeonSpecter",
  "map_progress": 0,
  "security_credits": 100,
  "last_synced_at": "ISO-Timestamp | null",
  "created_at": "ISO-Timestamp"
}
```

**Web User Response**:

```json
{
  "web_profile_id": "uuid-string",
  "user_id": "uuid-string",
  "display_name": "Dr. Thorne",
  "portal_access": true,
  "last_login_at": "ISO-Timestamp | null"
}
```

---

## 3. Game Sessions

**Endpoint**: `POST /sessions/start`  
**Endpoint**: `PATCH /sessions/{session_id}/end`  
**Endpoint**: `GET /sessions/history`

**Session Response**:

```json
{
  "session_id": "uuid-string",
  "profile_id": "uuid-string",
  "map_name": "Home | Office | Internet Cafe | Public Park",
  "duration_seconds": 0,
  "credits_earned": 0,
  "credits_lost": 0,
  "false_positives": 0,
  "result": "win | lose | timeout | null",
  "is_synced": true,
  "played_at": "ISO-Timestamp",
  "created_at": "ISO-Timestamp"
}
```

---

## 4. Leaderboard

**Endpoint**: `GET /leaderboard`  
**Response**:

```json
[
  {
    "score_id": "uuid-string",
    "username": "NeonSpecter",
    "total_score": 1250,
    "map_name": "Home",
    "recorded_at": "ISO-Timestamp"
  }
]
```

---

## 5. Threat Index

**Endpoint**: `GET /players/threat-index`  
**Response**:

```json
[
  {
    "index_id": "uuid-string",
    "profile_id": "uuid-string",
    "threat_name": "Rogue Software",
    "is_unlocked": true,
    "is_synced": true,
    "unlocked_at": "ISO-Timestamp | null"
  }
]
```

---

## 6. Classroom Management (Educator Only)

**Endpoint**: `GET /classroom/my-codes`  
**Endpoint**: `POST /classroom/generate`  
**Endpoint**: `GET /classroom/{code_id}/students`

**Code List Response**:

```json
[
  {
    "code_id": "uuid-string",
    "code_value": "MORPH9",
    "is_active": true,
    "student_count": 5,
    "created_at": "ISO-Timestamp"
  }
]
```

---

## 🛠️ Implementation Rules:

1. **Case**: Always use `snake_case` for JSON keys.
2. **Auth**: All endpoints except `/auth/login`, `/auth/register`, and `/leaderboard` require the `Authorization: Bearer <token>` header.
3. **Empty Lists**: If no data exists (e.g., no sessions), return an empty list `[]`, not `null`.
