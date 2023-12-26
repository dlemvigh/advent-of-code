import pprint

input = """jqt: rhn xhk nvd
rsh: frs pzl lsr
xhk: hfx
cmg: qnr nvd lhk bvb
rhn: xhk bvb hfx
bvb: xhk hfx
pzl: lsr hfx nvd
qnr: nvd
ntq: jqt hfx bvb xhk
nvd: lhk
lsr: lhk
rzs: qnr cmg lsr rsh
frs: qnr lhk lsr"""

edges = []
for line in input.split("\n"):
    parts = line.split(": ")
    src = parts[0]
    for dest in parts[1].split(" "):
        edges.append([src, dest])

#print(edges)
#pprint.pprint(edges)
with open("output.txt", 'w') as file:
    for src, dest in edges:
        file.write(f"{src} {dest}\n")