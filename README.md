# QA API Automation Assessment

## Overview

This project contains automated API tests for the Restful-Booker API using **Playwright with TypeScript**.

The automation covers authentication, booking creation and retrieval, booking price calculation, and placeholder price detection as required by the assessment.

---

## API Details

**Base URL:**

`https://restful-booker.herokuapp.com`

**API Documentation:**

`https://restful-booker.herokuapp.com/apidoc/index.html`

No API key or local installation of the application is required.

The API sandbox may reset frequently, therefore each test creates and uses its own required test data.

---

## Technology

- Playwright
- TypeScript
- Node.js
- Playwright Test

---

## Setup

Install the project dependencies:

```bash
npm install
```

---

## Run Tests

Run the complete test suite with:

```bash
npm test
```

The complete test suite can be executed with this single command.

---

## Endpoints Covered

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/auth` | Generate authentication token |
| GET | `/booking/{id}` | Retrieve a booking |
| POST | `/booking` | Create a booking |
| PATCH | `/booking/{id}` | Update booking fields |

For authenticated PATCH requests, the token is sent using:

```text
Cookie: token=<token>
```

---

## Test Coverage

### 1. Authentication

The authentication tests verify:

- A valid username and password can generate an authentication token.
- The returned token is present and valid.
- A PATCH request without an authentication token is rejected.
- The appropriate HTTP status code is asserted for the unauthenticated PATCH request.

Credentials used for the assessment:

```text
Username: admin
Password: password123
```

---

### 2. Create and Read Back Booking

The test creates a booking using `POST /booking` and then retrieves the created booking using `GET /booking/{id}`.

The following fields are validated against the original request:

- `firstname`
- `lastname`
- `totalprice`
- `depositpaid`
- `bookingdates.checkin`
- `bookingdates.checkout`
- `additionalneeds`

The test also validates the expected data types, including:

- `totalprice` must be a number.
- `depositpaid` must be a boolean.

The assertions verify exact values rather than only checking whether the API request was successful.

---

### 3. Price Calculation

The expected booking price is calculated independently using the following rule:

```text
nights = checkout - checkin

totalprice = nightly_rate × nights
```

The calculated expected price is then compared with the value returned by the API.

The test also includes a decimal calculation scenario such as:

```text
89.95 × 4 = 359.80
```

This verifies that decimal values are not incorrectly rounded or truncated.

---

### 4. Placeholder Price Detection

A booking with:

```text
totalprice = 9999
```

is created and retrieved.

The test treats `9999` as a placeholder/sentinel value rather than accepting it as a legitimate price.

The rule used by the test is:

```text
If totalprice === 9999,
the value is flagged as a placeholder.
```

This rule is specifically based on the assessment requirement.

---

## Test Independence

Each test creates its own required booking data.

Tests do not depend on:

- Another test running first.
- A booking ID created by another test.
- Data created by a previous test.

Therefore, tests can be executed individually or in any order.

## Assertions

The tests use specific assertions for:

- HTTP status codes.
- Exact response values.
- Expected data types.
- Booking fields.
- Calculated total price.
- Authentication behavior.
- Placeholder price detection.

A successful HTTP response alone is not considered sufficient validation.

---

## API Risks / Observations

The test execution may identify API behavior that should be considered a bug or risk.

The following areas are specifically validated or observed:

- Authentication behavior for protected endpoints.
- Accuracy of returned booking data.
- Data type consistency.
- Price calculation and decimal handling.
- Acceptance of placeholder values such as `9999`.
- Behavior of the API when the sandbox resets.

Any additional API issue identified during execution should be documented with the expected behavior, actual behavior, and relevant HTTP status/response details.

---

## Expected Result

All required assessment scenarios should be automated and executable using:

```bash
npm test
```

The tests should remain independent and validate specific status codes, exact values, data types, business calculations, and placeholder detection as required by the assessment.