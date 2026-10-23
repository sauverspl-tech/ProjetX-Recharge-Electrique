"""Prépare uniquement le prototype et ses données publiques pour GitHub Pages."""
from pathlib import Path
import json
import shutil

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "_site"

def main():
    data = json.loads((ROOT / "cm3/donnees.json").read_text())
    assert len(data["territoires"]) == 109, "Nombre de territoires inattendu"
    assert sum(bool(t["comparable"]) for t in data["territoires"]) == 96
    assert len({t["code"] for t in data["territoires"]}) == 109
    OUT.mkdir(exist_ok=True)
    expected = {"index.html", "donnees.json", "carte.json", "carte.js", ".nojekyll", "README.md"}
    unexpected = {p.name for p in OUT.iterdir()} - expected
    if unexpected:
        raise RuntimeError("Dossier de publication non vide : " + ", ".join(sorted(unexpected)))
    for name in ("index.html", "donnees.json", "carte.json", "carte.js"):
        shutil.copyfile(ROOT / "cm3" / name, OUT / name)
    (OUT / ".nojekyll").write_text("")
    (OUT / "README.md").write_text(
        "# Recharge France\n\nComparateur départemental CM3. "
        "Données publiques sous Licence Ouverte 2.0 ; sources et dates dans le prototype.\n"
        "Analyse et retours : https://github.com/sauverspl-tech/ProjetX-Recharge-Electrique\n"
    )
    print("Prototype prêt dans", OUT)

if __name__ == "__main__":
    main()
