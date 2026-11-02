1. Firstly agent used standard trim becuase agent recognized `any white space character` as common white space characters.
2. False signals were test R1, R2, R3 which did not check any hidden white space character like U+200B.
3. I added test for checking a hidden white space character.
