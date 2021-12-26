from typing import TypedDict

class State(TypedDict):
	index: int
	log: str

input = "D2FE28"
input = "38006F45291200"
# input = "EE00D40C823060"
# input = "8A004A801A8002F478"
# input = "620080001611562C8802118E34"
# input = "C0015000016115A2E0802F182340"
# input = "A0016C880162017C3686B18A3D4780"

# input = "C200B40A82"
# input = "04005AC33890"
# input = "880086C3E88112"
input = "CE00C43D881120"
input = "D8005AC2A8F0"
input = "F600BC2D8F"
input = "9C005AC2F8F0"
input = "9C0141080250320F1802104A08"

# input = "220D700071F39F9C6BC92D4A6713C737B3E98783004AC0169B4B99F93CFC31AC4D8A4BB89E9D654D216B80131DC0050B20043E27C1F83240086C468A311CC0188DB0BA12B00719221D3F7AF776DC5DE635094A7D2370082795A52911791ECB7EDA9CFD634BDED14030047C01498EE203931BF7256189A593005E116802D34673999A3A805126EB2B5BEEBB823CB561E9F2165492CE00E6918C011926CA005465B0BB2D85D700B675DA72DD7E9DBE377D62B27698F0D4BAD100735276B4B93C0FF002FF359F3BCFF0DC802ACC002CE3546B92FCB7590C380210523E180233FD21D0040001098ED076108002110960D45F988EB14D9D9802F232A32E802F2FDBEBA7D3B3B7FB06320132B0037700043224C5D8F2000844558C704A6FEAA800D2CFE27B921CA872003A90C6214D62DA8AA9009CF600B8803B10E144741006A1C47F85D29DCF7C9C40132680213037284B3D488640A1008A314BC3D86D9AB6492637D331003E79300012F9BDE8560F1009B32B09EC7FC0151006A0EC6082A0008744287511CC0269810987789132AC600BD802C00087C1D88D05C001088BF1BE284D298005FB1366B353798689D8A84D5194C017D005647181A931895D588E7736C6A5008200F0B802909F97B35897CFCBD9AC4A26DD880259A0037E49861F4E4349A6005CFAD180333E95281338A930EA400824981CC8A2804523AA6F5B3691CF5425B05B3D9AF8DD400F9EDA1100789800D2CBD30E32F4C3ACF52F9FF64326009D802733197392438BF22C52D5AD2D8524034E800C8B202F604008602A6CC00940256C008A9601FF8400D100240062F50038400970034003CE600C70C00F600760C00B98C563FB37CE4BD1BFA769839802F400F8C9CA79429B96E0A93FAE4A5F32201428401A8F508A1B0002131723B43400043618C2089E40143CBA748B3CE01C893C8904F4E1B2D300527AB63DA0091253929E42A53929E420"

log_level = "simple" # simple | debug


def parse_input(input: str):
	binary = "".join(map(lambda x: bin(int(x, 16))[2:].zfill(4), input))

	# ensure length is multiple of 4
	if (len(binary) % 4) != 0:
		binary = ("0" * (4 - (len(binary) % 4))) + binary

	return binary

def parse_package(bits: str, state: State = None, log_name_override: str = None, indent: str = " "):
	if state == None:
		state: State = {
			"index": 0,
			"log": ""
		}

	version = read_int(bits, state, 3, log_name_override or "V")
	if log_level == "debug":
		print(indent, "version", version)
	type = read_int(bits, state, 3, log_name_override or "T")
	if log_level == "debug":
		print(indent, "type", type, type == 4 and "(literal)" or "(operator)")

	version_sum: int = 0
	value: int = 0
	if type == 4:
		# parse literal´
		value = parse_literal(bits, state, log_name_override, indent)
	else:
		# parse operator
		version_sum, value = parse_operator(bits, state, type, log_name_override, indent)

	
	version_sum += version

	if not log_name_override:
		print()
		print(bits)
		print(state["log"])

	return version_sum, value

def parse_literal(bits: str, state: State, log_name_override: str, indent: str):
	read = True
	log_name = "A"
	value_bits = ""

	while read:
		chunk = read_bits(bits, state, 5, log_name_override or log_name)
		read = chunk[0] == "1"
		value_bits += chunk[1:]
		log_name = chr(ord(log_name) + 1)

	value = int(value_bits, 2)
	print(indent, "value", value)
	return value

def parse_operator(bits: str, state: State, type: int, log_name_override: str, indent: str):
	version_sum, values = parse_sub_packages(bits, state, indent)
	# print()
	value: int = 0
	if type == 0:
		value = sum(values)
		print(indent, "sum", value, values)
	if type == 1:
		value = 1
		for x in values:
			value *= x
		print(indent, "product", value, values)
	if type == 2:
		value = min(values)
		print(indent, "min", value, values)
	if type == 3:
		value = max(values)
		print(indent, "max", value, values)
	if type == 5:
		left, right = values
		value = left > right and 1 or 0
		print(indent, "greater than", value, values)
	if type == 6:
		left, right = values
		value = left < right and 1 or 0
		print(indent, "less than", value, values)
	if type == 7:
		left, right = values
		value = left == right and 1 or 0
		print(indent, "equals", value, values)

	return (version_sum, value)

def parse_sub_packages(bits: str, state: State, indent: str):
	version_sum = 0
	values = []

	length_type = read_bits(bits, state, 1, "I")
	if log_level == "debug":
		print(indent, "length type", length_type)

	log_name = "A"
	if length_type == "0":
		length = read_int(bits, state, 15, "L")
		if log_level == "debug":
			print(indent, "length", length)

		final_index = state["index"] + length
		while state["index"] != final_index:
			if log_level == "debug":
				print()
				print(indent, "  sub-package", log_name)
			version, value = parse_package(bits, state, log_name, indent + "  ")
			# print("  value", value)
			log_name = chr(ord(log_name) + 1)
			version_sum += version
			values.append(value)
	if length_type == "1":
		count = read_int(bits, state, 11, "L")
		if log_level == "debug":
			print(indent, "count", count)

		for _ in range(count):
			if log_level == "debug":
				print()
				print(indent, "  sub-package", log_name)
			version, value = parse_package(bits, state, log_name, indent + "  ")
			log_name = chr(ord(log_name) + 1)
			version_sum += value
			values.append(value)

	return version_sum, values

def read_bits(bits: str, state: State, length: int, log_name: str = ""):
	value = bits[state["index"] : state["index"] + length]
	state["index"] += length
	state["log"] += log_name * length
	return value


def read_int(bits: str, state: State, length: int, log_name: str):
	value = read_bits(bits, state, length)
	state["log"] += log_name * length
	return int(value, 2)

bits = parse_input(input)
version, value = parse_package(bits)
print("version", version, "value", value)

# too high 1923006199543

