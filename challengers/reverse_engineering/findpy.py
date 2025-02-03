### THIS NOT HELP YOU FIND THE FLAG 
def apply_xor(text, key):
    
    extended_key = key
    idx = 0
    while len(extended_key) < len(text):
        extended_key = extended_key + key[idx]
        idx = (idx + 1) % len(key)
    return "".join([chr(ord(t) ^ ord(k)) for (t, k) in zip(text, extended_key)])


encrypted_flag = open('flag.txt.enc', 'rb').read()


def authenticate_user():
    entered_password = input("Please enter the correct password to retrieve the flag: ")
    if(entered_password == "xy34" + \
                           "-bcdefg567" + \
                           "_123" + \
                           "ssecure2025"):
        print("Access granted... Here is your flag, user:")
        decrypted_flag = apply_xor(encrypted_flag.decode(), "utilitarian")
        print(decrypted_flag)
        return
    print("Incorrect password")


authenticate_user()
