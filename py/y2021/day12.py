from collections import deque
import networkx as nx

input = """start-A
start-b
A-c
A-b
b-d
A-end
b-end"""

input = """dc-end
HN-start
start-kj
dc-start
dc-HN
LN-dc
HN-end
kj-sa
kj-HN
kj-dc"""

input = """fs-end
he-DX
fs-he
start-DX
pj-DX
end-zg
zg-sl
zg-pj
pj-he
RW-he
fs-DX
pj-RW
zg-RW
start-pj
he-WI
zg-he
pj-fs
start-RW"""

input = """pf-pk
ZQ-iz
iz-NY
ZQ-end
pf-gx
pk-ZQ
ZQ-dc
NY-start
NY-pf
NY-gx
ag-ZQ
pf-start
start-gx
BN-ag
iz-pf
ag-FD
pk-NY
gx-pk
end-BN
ag-pf
iz-pk
pk-ag
iz-end
iz-BN"""

# parse input to graph
	# node
		# edges
		# size (big/small)
		# start: bool
		# end: bool
	# start node
	# end node
# do breadth first search
	# push start to fifo queue
		# deque

G = nx.Graph()
G.add_node("start")
G.add_node("end")

for line in input.split("\n"):
	G.add_edge(*line.split("-"))

def find_all_paths(graph):
	paths_to_end = 0
	queue = deque()
	
	node = "start"
	path = ["start"]
	queue.append([node, path])

	print(queue)

	while len(queue) > 0:
		node, path = queue.popleft()
		for n in graph.adj[node].keys():
			if (n == "end"):
				paths_to_end += 1
				continue
			if (n.islower() and n in path):
				continue
			queue.append([n, path + [n]])

	return paths_to_end

def find_all_paths2(graph):
	paths_to_end = set()
	queue = deque()
	
	node = "start"
	path = ["start"]
	queue.append([node, path])

	print(queue)

	while len(queue) > 0:
		node, path = queue.popleft()
		for n in graph.adj[node].keys():
			if (n == "start"):
				continue
			if (n == "end"):
				s = ",".join(path) + ",end"
				# print(s)
				paths_to_end.add(s)
				continue
			if (n.islower()):
				if (n in path):
					if ("twice" in path):
						continue
					queue.append([n, path + [n, "twice"]])
				else:
					queue.append([n, path + [n]])
			else:
				queue.append([n, path + [n]])

	return len(paths_to_end)

# print(dir(G))
print(find_all_paths2(G))