import json
import os
import glob

dirs = ['27-伏羲氏/01-少典轩辕氏', '27-伏羲氏/02-柱下史共工氏列']
base = r'f:\GitHub\NEXUS\src\annotations\演进轨迹\事册之载\11-禪通纪\01-伏羲朝代'

errors = []
valid = 0
total = 0

for d in dirs:
    full_path = os.path.join(base, d)
    if os.path.exists(full_path):
        for f in glob.glob(os.path.join(full_path, '*.json')):
            total += 1
            try:
                with open(f, 'r', encoding='utf-8') as file:
                    json.load(file)
                valid += 1
            except Exception as e:
                errors.append((f, str(e)))

print(f'Total JSON files: {total}')
print(f'Valid JSON files: {valid}')
print(f'Invalid JSON files: {len(errors)}')

if errors:
    print('\nErrors:')
    for f, e in errors:
        print(f'  {f}: {e}')
