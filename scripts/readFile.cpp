#include <fstream>
#include <iostream>

int main(int argc, char* argv[]) {
	if(argc < 2)
		exit(1);

	std::ifstream in(argv[1]);
	std::string s;

	char flag = 0;

	while(getline(in, s)) {
		if(s == "---") {flag+=1; continue;};
		if(flag < 2) {
			continue;
		}

		std::cout << s << "\n";
	}
}
