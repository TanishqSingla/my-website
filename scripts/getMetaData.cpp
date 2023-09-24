#include <iostream>
#include <fstream>
#include <string>
#include <vector>

struct kv {
	std::string key;
	std::string value;

	kv() {
		this->key = std::string("");
		this->value = std::string("");
	}
	kv(std::string k, std::string v) {
		this->value = v;
		
		this->key = "\"" + k + "\"";
	}
};

static std::vector<kv> pairs;

std::string trim(std::string& s) {
	std::string::iterator b_it = s.begin();
	std::string::iterator e_it = s.end();

	while(*b_it == ' ') {
		++b_it;
	}

	while(*e_it == ' ') {
		--e_it;
	}

	return std::string(b_it, e_it);
}

void parseLine(std::string& line) {
	std::string::iterator it = line.begin();

	while(it != line.end()) {
		if(*it == ':') {
			break;
		}
		++it;
	}
	auto key = std::string(line.begin(), it);
	++it;
	auto value = std::string(it, line.end());

	kv *result = new kv(trim(key), trim(value));

	pairs.push_back(*result);
}

void printJSON() {
	std::cout << "{";
	for(int i = 0; i < pairs.size(); i++) {
		std::cout << pairs[i].key << ":" << pairs[i].value;
		if(i < pairs.size() - 1) {
			std::cout << ",";
		}
	}
	std::cout << "}";
}

int main(int argc, char* argv[]) {
	if(argc < 2) {
		exit(1);
	}

	std::ifstream in(argv[1]);
	std::string s;

	char flag = 0;

	while(getline(in, s)) {
		if(s == "---") {
			if(flag) {break;}
			flag = 1;
			continue;
		}

		parseLine(s);
	}

	printJSON();
}
