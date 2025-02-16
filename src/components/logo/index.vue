<template>
    <div class="flex justify-center items-center w-1/2">
        <el-image @click="info" class="h-500 hover:scale-110 select-none  duration-700"
            src='/logo.webp'></el-image>
    </div>
</template>

<script setup lang="ts">
import { ElNotification } from "element-plus"

const poems = [{ 'content': '粗缯大布裹生涯，腹有诗书气自华。', 'title': '苏轼《和董传留别》' }, { 'content': '读书不觉已春深，一寸光阴一寸金。', 'title': '王贞白《白鹿洞二首·其一》' }, { 'content': '三更灯火五更鸡，正是男儿读书时。', 'title': '颜真卿《劝学诗》' }, { 'content': '黑发不知勤学早，白首方悔读书迟。', 'title': '颜真卿《劝学诗》' }, { 'content': '古人学问无遗力，少壮工夫老始成。', 'title': '陆游《冬夜读书示子聿》' }, { 'content': '江山代有才人出，各领风骚数百年。', 'title': '赵翼《论诗五首·其二》' }, { 'content': '学而不思则罔，思而不学则殆。', 'title': '《论语·为政篇》' }, { 'content': '眼前直下三千字，胸次全无一点尘。', 'title': '于谦《观书》' }, { 'content': '富贵必从勤苦得，男儿须读五车书。', 'title': '杜甫《柏学士茅屋》' }, { 'content': '读书破万卷，下笔如有神。', 'title': '杜甫《奉赠韦左丞丈二十二韵》' }, { 'content': '青春须早为，岂能长少年。', 'title': '孟郊《劝学》' }, { 'content': '半亩方塘一鉴开，天光云影共徘徊。', 'title': '朱熹《活水亭观书有感二首·其一》' }, { 'content': '鱼离水则身枯，心离书则神索。', 'title': '《格言联璧·学问类》' }, { 'content': '书卷多情似故人，晨昏忧乐每相亲。', 'title': '于谦《观书》' }, { 'content': '清水出芙蓉，天然去雕饰。', 'title': '李白《经乱离后天恩流夜郎忆旧游书怀赠江夏韦太守良宰》' }, { 'content': '一月不读书，耳目失精爽。', 'title': '萧抡谓《读书有所见作》' }, { 'content': '滥交朋友，不如终日读书。', 'title': '《围炉夜话·第四一则》' }, { 'content': '读书不下苦功，妄想显荣，岂有此理？', 'title': '《围炉夜话·第一一四则》' }, { 'content': '为学无间断，如流水行云，日进而不已也。', 'title': '《围炉夜话·第十四则》' }, { 'content': '少而学者如日出之阳，壮而学者如日中之光，老而学者如秉烛之明。', 'title': '《太平御览·火部·卷三》' }, { 'content': '吾生也有涯，而知也无涯。', 'title': '《庄子·内篇·养生主》' }, { 'content': '昨日邻家乞新火，晓窗分与读书灯。', 'title': '王禹偁《清明》' }, { 'content': '文章本天成，妙手偶得之。', 'title': '陆游《文章》' }, { 'content': '一日不读书，胸臆无佳想。', 'title': '萧抡谓《读书有所见作》' }, { 'content': '书当快意读易尽，客有可人期不来。', 'title': '陈师道《绝句·书当快意读易尽》' }, { 'content': '娶妻莫恨无良媒，书中自有颜如玉。', 'title': '赵恒《劝学诗》' }, { 'content': '此生不学一可惜，此日闲过二可惜，此身一败三可惜。', 'title': '《格言联璧·持躬类》' }, { 'content': '人学始知道，不学非自然。', 'title': '孟郊《劝学》' }, { 'content': '出师一表通今古，夜半挑灯更细看。', 'title': '陆游《病起书怀》' }, { 'content': '人不博览者，不闻古今，不见事类，不知然否，犹目盲、耳聋、鼻痈者也。', 'title': '《论衡·卷十三·别通篇》' }, { 'content': '积学以储宝，酌理以富才', 'title': '《文心雕龙·神思》' }, { 'content': '案上不可多书，心中不可少书。', 'title': '《格言联璧·学问类》' }, { 'content': '读书须用意，一字值千金。', 'title': '《增广贤文·上集》' }, { 'content': '安居不用架高堂，书中自有黄金屋。', 'title': '赵恒《劝学诗》' }, { 'content': '一时劝人以口，百世劝人以书。', 'title': '《了凡四训·积善之方》' }, { 'content': '温故而知新，可以为师矣。', 'title': '《论语·为政篇》' }, { 'content': '读书好处心先觉，立雪深时道已传。', 'title': '《随园诗话·卷三》' }, { 'content': '奇文共欣赏，疑义相与析。', 'title': '陶渊明《移居二首》' }, { 'content': '不学自知，不问自晓，古今行事，未之有也。', 'title': '《论衡·卷二十六·实知篇》' }, { 'content': '酒盈杯，书满架，名利不将心挂。', 'title': '李珣《渔歌子·荻花秋》' }, { 'content': '读未见书，如得良友；见已读书，如逢故人。', 'title': '《格言联璧·学问类》' }, { 'content': '爱好由来下笔难，一诗千改始心安。', 'title': '袁枚《遣兴》' }, { 'content': '学不精勤，不如不学 。', 'title': '《周书·列传·卷二十五》' }, { 'content': '把君诗卷灯前读，诗尽灯残天未明。', 'title': '白居易《舟中读元九诗》' }, { 'content': '灯火纸窗修竹里，读书声。', 'title': '陈继儒《浣溪沙·初夏夜饮归》' }, { 'content': '不薄今人爱古人，清词丽句必为邻。', 'title': '杜甫《戏为六绝句》' }, { 'content': '李杜诗篇万口传，至今已觉不新鲜。', 'title': '赵翼《论诗五首》' }, { 'content': '读书为身上之用，而人以为纸上之用。', 'title': '《格言联璧·悖凶类》' }, { 'content': '一时劝人以言，百世劝人以书。', 'title': '《格言联璧·惠吉类》' }]


const info = () => {
    const poem = poems[Math.floor(Math.random() * poems.length)]
    ElNotification({
        title: poem['title'],
        message: poem['content'],
        type: 'info',
    })
}
</script>
