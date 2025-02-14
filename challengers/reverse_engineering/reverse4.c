#include <stdio.h>
#include <string.h>
#include <stdlib.h>

// XOR encryption/decryption function
void xor_encrypt_decrypt(char *data, size_t length, char key) {
    for (size_t i = 0; i < length; i++) {
        data[i] ^= key;  // XOR each byte of data
    }
}

// Simple hash function to "hide" the key (by summing the ASCII values of the digits)
unsigned int simple_hash(int key) {
    unsigned int hash = 0;
    while (key > 0) {
        hash += key % 10;  // Sum the digits
        key /= 10;          // Remove the last digit
    }
    return hash;
}

int main() {
    
    char xor_key = 0xAA;

    
    char mykey_encrypted[] = {0x71, 0x7A, 0x72};  // Encrypted "119" using XOR
    char riodata_encrypted[] = {0x5D, 0x6E, 0x47, 0x44, 0x51, 0x6E, 0x57, 0x4C, 0x41, 0x4A, 0x7C, 0x7D, 0x59};  // Encrypted "RIO{CQAdss_ff23_bvde36}"

    
    size_t mykey_length = sizeof(mykey_encrypted) / sizeof(mykey_encrypted[0]);
    size_t riodata_length = sizeof(riodata_encrypted) / sizeof(riodata_encrypted[0]);

    
    xor_encrypt_decrypt(mykey_encrypted, mykey_length, xor_key);
    xor_encrypt_decrypt(riodata_encrypted, riodata_length, xor_key);

    
    mykey_encrypted[mykey_length] = '\0';  
    riodata_encrypted[riodata_length] = '\0';  

    
    printf("Decrypted mykey: %s\n", mykey_encrypted);
    printf("Decrypted RIO data: %s\n", riodata_encrypted);

    
    int mykey_int = atoi(mykey_encrypted);

    
    unsigned int hash_key = simple_hash(mykey_int);

    int key;
    printf("Enter key: ");
    scanf("%d", &key);

    if (simple_hash(key) == hash_key) {
        printf("Correct key: %d\n", key);
        printf("Decrypted RIO data: %s\n", riodata_encrypted);  
    } else {
        printf("Incorrect.\n");
        return 1;
    }

    return 0;
}
