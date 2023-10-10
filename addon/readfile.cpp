#include <cstring>
#include <filesystem>
#include <fstream>

namespace fs = std::filesystem;

extern "C" {
	const char* readfile(const char* filename) {
		char *contents = (char*)malloc(65536000);
		if(!fs::exists(filename)) {
			return "Error: File does not exist";
		}

		std::ifstream in(filename);
		std::string s;

		char flag = 0;
		while(std::getline(in, s)) {
			if(s == "---") {flag++; continue;}
			if(flag < 2) {
				continue;
			}

			s += "\n";
			strcat(contents, s.c_str());
		}

		const char* result = contents;

		return result;
	}
}
