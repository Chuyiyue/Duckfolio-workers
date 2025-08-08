import { NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import path from 'path';
import fs from 'fs';

export async function GET() {
  const configPath = path.join(process.cwd(), 'public/platform-config.json');

  console.log(`尝试读取配置文件路径: ${configPath}`);

  try {
    if (!fs.existsSync(configPath)) {
      console.error(`配置文件不存在: ${configPath}`);
      return NextResponse.json({ error: '配置文件不存在' }, { status: 404 });
    }

    const stats = fs.statSync(configPath);
    console.log(`文件大小: ${stats.size}字节, 最后修改时间: ${stats.mtime}`);

    const json = await readFile(configPath, { encoding: 'utf-8', flag: 'r' });
    console.log(
      `成功读取配置文件，内容前100字符: ${json.substring(0, 100)}...`
    );

    return NextResponse.json(JSON.parse(json));
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`读取配置文件失败: ${error.message}`);
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      console.error('读取配置文件失败: 未知错误');
      return NextResponse.json({ error: '未知错误' }, { status: 500 });
    }
  }
}
