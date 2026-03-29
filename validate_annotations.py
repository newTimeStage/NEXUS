import json
import os
from pathlib import Path

def validate_json_files():
    base_dir = Path("f:/GitHub/NEXUS/src/annotations/演进轨迹/事册之载/11-禪通纪/03-神農朝代")
    
    errors = []
    success_count = 0
    
    # 查找所有JSON文件
    for json_file in base_dir.rglob("*.json"):
        try:
            with open(json_file, 'r', encoding='utf-8') as f:
                json.load(f)
            success_count += 1
            print(f"✓ {json_file.relative_to(base_dir)}")
        except json.JSONDecodeError as e:
            errors.append(f"JSON语法错误: {json_file.relative_to(base_dir)} - {str(e)}")
            print(f"✗ {json_file.relative_to(base_dir)} - JSON语法错误")
        except Exception as e:
            errors.append(f"其他错误: {json_file.relative_to(base_dir)} - {str(e)}")
            print(f"✗ {json_file.relative_to(base_dir)} - {str(e)}")
    
    print(f"\n验证结果:")
    print(f"成功: {success_count} 个文件")
    print(f"失败: {len(errors)} 个文件")
    
    if errors:
        print("\n错误详情:")
        for error in errors:
            print(f"  - {error}")
    
    return len(errors) == 0

if __name__ == "__main__":
    success = validate_json_files()
    exit(0 if success else 1)
