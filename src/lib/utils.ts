import { generateRandomString, alphabet } from "oslo/crypto";

// 10-characters long string consisting of the lowercase alphabet and numbers
generateRandomString(10, alphabet("a-z", "0-9"));