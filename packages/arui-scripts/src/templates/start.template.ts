import configs from '../configs/app-configs';
import applyOverrides from '../configs/util/apply-overrides';

const startTemplate = `#!/bin/sh

# Подменяем env переменные в nginx конфиге перед стартом
# Сначала заменяем все слова, начинающиеся на $ но без \${} на ~~слово~~
# затем запускаем envsubst, после этого обратно заменяем ~~слово~~ на $слово.
# Это нужно для того, чтоб специальные переменные nginx не подменялись envsubst'ом на
# пустые строки. envsubst будет заменять только \${слово}.
cat ./nginx.conf \\
    | sed 's/\\$\\([a-zA-Z0-9_-]\\{1,\\}\\)/~~\\1~~/' \\
    | envsubst \\
    | sed 's/~~\\([a-zA-Z0-9_-]\\{1,\\}\\)~~/$\\1/' \\
    > /etc/nginx/conf.d/default.conf

# Достаем лимит памяти из cgroup, это то, как его докер задает.  https://shuheikagawa.com/blog/2017/05/27/memory-usage/
max_total_memory=$(cat /sys/fs/cgroup/memory/memory.limit_in_bytes)
# Самой nodejs мы не можем отдать совсем всю память, операционная система+nginx все же требуют какого то количества.
# Поэтому мы вычитаем 100мб на нужды ос
node_memory_limit="$(($max_total_memory / 1024 / 1024 - 100))"

# Start the nginx process in background
nginx &

# Start nodejs process
node --max-old-space-size="$node_memory_limit" ./${configs.buildPath}/${configs.serverOutput}
`;

export default applyOverrides('start.sh', startTemplate);
