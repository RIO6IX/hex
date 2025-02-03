#include <stdio.h>
#include <string.h>

int main(int argc, char* argv[]) {
    if (argc != 2) {
        printf("Incorrect number of arguments (should be 2)\n");
        printf("Goodbye");
        return 1;
    }

    char flag[] = {82, 73, 79, 123, 89, 111, 117, 95, 71, 111, 116, 95, 73, 116, 125};

    
    int result = strcmp("secret", argv[1]);

    if (result != 0) {
        printf("Incorrect second argument\n");
        printf("Goodbye");
        return 2;
    }

    printf("Flag: ");
    for (int i = 0; i < sizeof(flag); i++) {
        printf("%c", flag[i]);
    }
    printf("\n");

    return 0;
}
