<template>
	<view>
		<cu-custom bgColor="bg-gradual-uc" class="bg-gradual-uc" :isBack="true">
		     <block slot="backText">信用轨迹</block>
		</cu-custom>
		<view class="cu-timeline" v-for="(item, index) in list" :key="index">
			<view class="cu-time time">{{item.time}}</view>
			<view class="cu-item text-blue">
				<view class="content bg-grey shadow-blur">
					<view class="cu-capsule radius">
						<view class="cu-tag line-cyan  ss">{{item.prize}}分</view>
					</view>
					<view class="margin-top">{{item.affair}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
						time: '2020-3-30',
						affair: '献血一次',
						prize: '+10'
					},
					{
						time: '2020-1-10',
						affair: '获得国家科技进步奖',
						prize: '+300'
					},

				],

			}
		},
		methods: {

		}
	}
</script>

<style>
	.time {
		width: 80px;
	}
</style>
