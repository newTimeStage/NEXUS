import os
from pathlib import Path

def scan_directory(directory):
    md_files = []
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith('.md'):
                md_files.append(os.path.join(root, file))
    return md_files

def main():
    base_dir = Path("f:/GitHub/NEXUS/src/content/演进轨迹/事册之载/12-疏仡纪")
    md_files = scan_directory(base_dir)

    print(f"Total .md files: {len(md_files)}")
    print("\nDirectory structure:")

    # 按目录分组统计
    dir_counts = {}
    for file in md_files:
        rel_path = os.path.relpath(file, base_dir)
        directory = os.path.dirname(rel_path)
        if directory not in dir_counts:
            dir_counts[directory] = 0
        dir_counts[directory] += 1

    for directory, count in sorted(dir_counts.items()):
        print(f"  {directory}: {count} files")

if __name__ == "__main__":
    main()
